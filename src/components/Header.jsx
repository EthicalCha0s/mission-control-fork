import HighlightStar from "../assets/HighlightStar"

const Header = ({text, position, noStar}) => {
  return (
    <div className="flex items-center">
    {noStar? "" : <HighlightStar/>}
    <h3 className={`${noStar ? "" :"lg:ml-2"} font-GoodTimes text-[24px] sm:text-3xl lg:text-4xl text-gradient ${position}`}>{text}</h3>
    </div>
  )
}

export default Header