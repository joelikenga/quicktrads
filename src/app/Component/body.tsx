import { Navbar } from "../global/navbar"
import { ExploreMore } from "./exploreMore"
import { Footer } from "./footer"
import { Hero } from "./hero"
import { Hero1 } from "./hero1"
import { Tops } from "./tops"
import { TwoPiece } from "./twoPiece"

export const Body = () => {
    return(
        <div className="w-full">
            <Navbar />
            <Hero />
            <Tops/>
            <ExploreMore />
            <Hero1 />
            <TwoPiece/>
            <Footer />
        </div>
    )
}