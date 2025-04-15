import Creature from "@/components/creature";
import Logo from "@/components/logo";
import Overlay from "@/components/overlay";

export default function Home() {


  return (
    <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}>
      <Overlay />
      <Logo />
    </div>
  )
}