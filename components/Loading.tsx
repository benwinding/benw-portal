export function Loading(props: { text: string }) {
  return <div className="flex flex-col items-center py-10">
    <div className="flex flex-col items-center">
      <h2 className="p-4 text-xl italic">{props.text || 'Loading...'}</h2>
    </div>
  </div>
}
