"use client"

type Listing = {
  id: string
  title: string
  views: number
  contacts: number
  expiryDate: string
  status: string
}

export default function ListingTable({ listings }: { listings: Listing[] }) {
  return (
    <table className="w-full bg-white rounded-lg shadow">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="p-3">Title</th>
          <th>Views</th>
          <th>Contacts</th>
          <th>Status</th>
          <th>Expiry</th>
        </tr>
      </thead>
      <tbody>
        {listings.map((item) => (
          <tr key={item.id} className="border-t">
            <td className="p-3">{item.title}</td>
            <td>{item.views}</td>
            <td>{item.contacts}</td>
            <td>{item.status}</td>
            <td>{item.expiryDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
