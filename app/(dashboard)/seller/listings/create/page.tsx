"use client"

import { useState } from "react"
import { auth, storage } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { createListing, checkMonthlyListingLimit } from "@/lib/dashboard"
import { useRouter } from "next/navigation"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

export default function CreateListingPage() {
  const router = useRouter()

  const [type, setType] = useState("vehicle")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [location, setLocation] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [meta, setMeta] = useState<any>({})
  const [loading, setLoading] = useState(false)

  const generateSlug = (text: string) =>
    text.toLowerCase().replace(/\s+/g, "-")

  const handleMetaChange = (key: string, value: any) => {
    setMeta((prev: any) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    onAuthStateChanged(auth, async (user) => {
      if (!user) return router.push("/login")

      const limit = await checkMonthlyListingLimit(user.uid)
      if (limit.limitReached) {
        alert("Monthly limit reached")
        setLoading(false)
        return
      }

      let imageUrl = ""

      if (image) {
        const imageRef = ref(
          storage,
          `listings/${user.uid}/${Date.now()}-${image.name}`
        )
        await uploadBytes(imageRef, image)
        imageUrl = await getDownloadURL(imageRef)
      }

      await createListing(user.uid, {
        title,
        slug: generateSlug(title),
        description,
        price: price ? Number(price) : null,
        location,
        type,
        imageUrls: imageUrl ? [imageUrl] : [],
        keywords: title.split(" "),
        meta,
      })

      router.push("/seller/listings")
    })
  }

  /* =============================
     🎯 Dynamic Fields Renderer
  ============================= */

  const renderDynamicFields = () => {
    switch (type) {

      case "vehicle":
        return (
          <>
            <input placeholder="Brand"
              onChange={(e) => handleMetaChange("brand", e.target.value)}
              className="input" />

            <input placeholder="Model"
              onChange={(e) => handleMetaChange("model", e.target.value)}
              className="input" />

            <input type="number" placeholder="Year"
              onChange={(e) => handleMetaChange("year", e.target.value)}
              className="input" />

            <input type="number" placeholder="KM Driven"
              onChange={(e) => handleMetaChange("kmDriven", e.target.value)}
              className="input" />
          </>
        )

      case "property":
        return (
          <>
            <input placeholder="Property Type (House/Land/Flat)"
              onChange={(e) => handleMetaChange("propertyType", e.target.value)}
              className="input" />

            <input type="number" placeholder="Area (sqft)"
              onChange={(e) => handleMetaChange("areaSqft", e.target.value)}
              className="input" />

            <input type="number" placeholder="Bedrooms"
              onChange={(e) => handleMetaChange("bedrooms", e.target.value)}
              className="input" />
          </>
        )

      case "job":
        return (
          <>
            <input placeholder="Job Type (Full-time/Part-time)"
              onChange={(e) => handleMetaChange("jobType", e.target.value)}
              className="input" />

            <input placeholder="Experience Required"
              onChange={(e) => handleMetaChange("experience", e.target.value)}
              className="input" />

            <input placeholder="Salary Range"
              onChange={(e) => handleMetaChange("salaryRange", e.target.value)}
              className="input" />
          </>
        )

      case "electronics":
        return (
          <>
            <input placeholder="Brand"
              onChange={(e) => handleMetaChange("brand", e.target.value)}
              className="input" />

            <input placeholder="Condition (New/Used)"
              onChange={(e) => handleMetaChange("condition", e.target.value)}
              className="input" />
          </>
        )

      case "machinery":
        return (
          <>
            <input placeholder="Machine Type"
              onChange={(e) => handleMetaChange("machineType", e.target.value)}
              className="input" />

            <input placeholder="Capacity"
              onChange={(e) => handleMetaChange("capacity", e.target.value)}
              className="input" />
          </>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">

      <h1 className="text-2xl font-bold text-white">
        Create New Listing
      </h1>

      <form onSubmit={handleSubmit}
        className="space-y-4 bg-white/5 p-8 rounded-2xl border border-white/10">

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="input"
        >
          <option value="vehicle">Vehicle</option>
          <option value="property">Property Sale</option>
          <option value="job">Job</option>
          <option value="electronics">Electronics</option>
          <option value="machinery">Machinery</option>
        </select>

        <input
          placeholder="Title"
          required
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />

        <textarea
          placeholder="Description"
          required
          onChange={(e) => setDescription(e.target.value)}
          className="input"
        />

        <input
          type="number"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
          className="input"
        />

        <input
          placeholder="Location"
          required
          onChange={(e) => setLocation(e.target.value)}
          className="input"
        />

        {renderDynamicFields()}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-orange-500 rounded-xl hover:bg-orange-600 transition"
        >
          {loading ? "Creating..." : "Create Listing"}
        </button>

      </form>
    </div>
  )
}
