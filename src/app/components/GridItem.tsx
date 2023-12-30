
const GridItem = (props: {
  title: string,
  icon: any,
  children: any
}) => {

  const renderTitle = () => {
    if (props.title) {
      return (
        <div className="flex gap-3 items-center translate-y-[-1px]">
          {props.icon}
          <h2 className="text-lg font-semibold">
            {props.title}
          </h2>
        </div>
      )
    }
  }

  return (
    <div className="relative bg-[#1d1c1d] p-4 border-[1px] border-[#303030] rounded-md">
      {renderTitle()}
      <div className="mt-3">
        {props.children}
      </div>
    </div>
  )
}

export default GridItem;