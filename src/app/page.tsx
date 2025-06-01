import Image from "next/image";

export default function Home() {
  return (

    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-lg border-[0.5px] rounded border-gray-800 p-5 h-[600px] max-h-[600px] overflow-y-auto flex flex-col space-y-2">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-15">
              <Image
                className="rounded-full"
                alt="AI"
                fill
                src="https://i.pinimg.com/222x/09/5c/44/095c44ce9421a10fad713a32d8648f6f.jpg"
              />
            </div>
          </div>
          <div className="chat-header">
            Artificial Intelligence
          </div>
          <div className="chat-bubble">You were the Chosen One!</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-15">
              <Image
                className="rounded-full"
                fill
                alt="User"
                src="https://i.pinimg.com/736x/92/20/88/922088e841d5d6c1bc9525bfdb7fe85e.jpg"
              />
            </div>
          </div>
          <div className="chat-header">
            User
          </div>
          <div className="chat-bubble">I hate you!</div>
        </div>
      </div>
      <div className="w-lg">
        <form className="flex w-full flex-col space-y-2">
          <textarea
            className="textarea textarea-bordered w-full focus:outline-none focus:border-none"
            cols={30}
            rows={10}
            placeholder="type your message here..."
          ></textarea>
          <button className="btn btn-primary" type="submit" >Send</button>
        </form>
      </div>
    </main>
  );
}
