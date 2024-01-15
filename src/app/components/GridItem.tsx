const GridItem = (props: { title: string; icon: any; children: any }) => {
  const renderTitle = () => {
    if (props.title) {
      return (
        <div className="flex translate-y-[-1px] items-center gap-3">
          {props.icon}
          <h2 className="text-lg font-semibold">{props.title}</h2>
        </div>
      );
    }
  };

  return (
    <div className="relative rounded-md border-[1px] border-[#303030] bg-[#1d1c1d] p-4">
      {renderTitle()}
      <div className="mt-3">{props.children}</div>
    </div>
  );
};

export default GridItem;
