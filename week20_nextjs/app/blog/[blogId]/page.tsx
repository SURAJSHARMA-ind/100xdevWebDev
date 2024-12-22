import axios from "axios"
async function page({ params }: {
  params: {
    blogId: String;
  }
}) {

  const bId = params.blogId

  const posts = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
  console.log(posts.data);

  return (
    <div>
      {posts.data.map((posts: {
        title: string,
        body: string
        id: number
      }) => {
        return (<div className="bg-slate-900 p-2 ">
          <p className="text-sm text-slate-400">Post {posts.id}</p>
          <div className="bg-slate-800 p-4 flex flex-col gap-2">
            <h1 className="text-2xl">{posts.title}</h1>
            <p className="text-sm text-slate-200">{posts.body}</p>
          </div>
        </div>
        )
      })}
      {/* <button className="bg-gray-400 p-2 rounded-md px-8" onClick={() => setCounter(counter + 1)}>{counter}</button> */}
      {/* <button className="bg-gray-400 p-2 rounded-md px-8" onClick={() => console.log("Clicked")} >Click me</button> */}
    </div>
  )
}

export default page
