'use client'
export default function ButtonComponet({ id }) {
  return (
    <a
      className='border border-black bg-slate-700 text-white my-2'
      href={`/post/${id}`}
    >
      CLick For page
    </a>
  )
}