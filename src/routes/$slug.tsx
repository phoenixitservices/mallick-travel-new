import { createFileRoute } from '@tanstack/react-router'
import { supabase } from "@/integrations/supabase/client"
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/$slug')({
  component: DynamicLegalPage,
})

function DynamicLegalPage() {
  // URL theke slug ta ber kore ana
  const { slug } = Route.useParams()
  
  const [pageData, setPageData] = useState<{ title: string; content: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchLegalPage() {
      setLoading(true)
      
      const { data, error } = await supabase
        .from("legal_pages")
        .select("title, content")
        .eq("slug", slug)
        .single()

      if (error || !data) {
        setError(true)
      } else {
        setPageData(data)
      }
      
      setLoading(false)
    }

    fetchLegalPage()
  }, [slug]) // slug change hole abar fetch korbe

  // Data asar aage loading dekhabe
  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <p className="text-gray-500">Loading content...</p>
      </div>
    )
  }

  // Database e page na thakle error dekhabe
  if (error || !pageData) {
    return (
      <div className="min-h-screen grid place-items-center">
        <h1 className="text-2xl font-bold text-red-500">Page Not Found</h1>
      </div>
    )
  }

  // Data peye gele content render korbe
  return (
    <main className="max-w-4xl mx-auto py-16 px-4 min-h-screen">
      <h1 className="text-4xl font-bold text-navy-deep mb-8">
        {pageData.title}
      </h1>
      
      <div 
        className="prose max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: pageData.content }}
      />
    </main>
  )
}
