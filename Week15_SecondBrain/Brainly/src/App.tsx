import { Button } from './components/ui/Button'
import { PlusIcon } from './icon/PlusIcon'
import { ShareIcon } from './icon/ShareIcon'


function App() {
  

  return (
    <>
     <Button
      variant={"primary"}
      startIcon={<PlusIcon size={"lg"} />} 
      endIcon={<ShareIcon size={"lg"} />} 
      size="lg" 
      title={"Share"}
     >
      
    </Button>
     <Button
      variant={"primary"}
      startIcon={<PlusIcon size={"sm"} />} 
      endIcon={<ShareIcon size={"sm"} />} 
      size="sm" 
      title={"Sum"}
     >
      
    </Button>
    </>
  )
}

export default App
