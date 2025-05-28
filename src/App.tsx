import Header from './components/ui/custom/header'
import NGOList from './routes/ngo-list'

function App() {
  return (
    <div className="flex justify-center items-start flex-col px-10 py-4 gap-5">
      <Header />
      <div className="mt-10 w-full">
        <NGOList />
      </div>
    </div>
  )
}

export default App
