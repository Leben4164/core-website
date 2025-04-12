import Creature from "@/components/creature";
import Logo from "@/components/logo";

export default function Home() {


  return (
    <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}>
      <Logo />
      <Creature />
    </div>
  )
}