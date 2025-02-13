import { Suspense } from 'react'
import Loader from "@/components/custom ui/Loader"
import CollectionForm from "@/components/collections/CollectionForm"

interface CollectionDetailsProps {
  params: Promise<{ collectionId: string }>
}

const CollectionDetails = async ({ params }: CollectionDetailsProps) => {
  const { collectionId } = await params

  const getCollectionDetails = async (): Promise<CollectionType | null> => {
    try { 
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/collections/${collectionId}`, {
        method: "GET",
        cache: 'no-store'
      })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      return await res.json()
    } catch (err) {
      console.error("[collectionId_GET]", err)
      return null
    }
  }

  return (
    <Suspense fallback={<Loader />}>
      <CollectionFormWrapper getCollectionDetails={getCollectionDetails} />
    </Suspense>
  )
}

const CollectionFormWrapper = async ({ 
  getCollectionDetails 
}: { 
  getCollectionDetails: () => Promise<CollectionType | null> 
}) => {
  const collectionDetails = await getCollectionDetails()
  return <CollectionForm initialData={collectionDetails} />
}

export default CollectionDetails