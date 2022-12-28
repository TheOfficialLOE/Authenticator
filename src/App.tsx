
const App = () => {
  return <div className="max-w-[75rem] mx-auto pt-40 px-6 flex flex-col md:flex-row justify-between flex-wrap">
    <p className="text-white text-2xl leading-9 max-w-[40rem] my-6">
      You're relaxed...
      <br/>
      You're sublime...
      <br/>
      You're amazing...
      <br/>
      Welcome to my safe 💀 place.
    </p>
    <div className="flex flex-col mt-6">
      <button className="mx-auto flex items-center justify-center text-white bg-[#47474A19] p-4 w-80 h-16 font-bold rounded-lg hover:bg-[#47474A33] hover:text-[#0ce877] transition-all duration-100">
        <span className="mx-2">Read More</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
        </svg>
      </button>
      <a href="https://github.com/TheOfficialLOE" target="_blank" className="mx-auto flex items-center justify-center text-white my-6 p-4 h-16 w-80 font-bold border border-[#15151a] rounded-lg hover:border-[#353540] hover:text-[#0ce877] transition-all duration-100">
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-github" width="20"
             height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
             stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path
            d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
        </svg>
        <span className="mx-2">Github</span>
      </a>
    </div>
  </div>
};

export default App;
