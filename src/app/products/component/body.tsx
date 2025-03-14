import { Items } from "./items"

export const Body = () => {
    return(
        <div>
            <Items onFilterChange={() => {}} filters={{ category: "", gender: [], size: [], priceRange: "" }} />
        </div>
    )
}