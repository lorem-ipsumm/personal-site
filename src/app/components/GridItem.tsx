const GridItem = (props: { title: any; icon: any; children: any }) => {
  const renderTitle = () => {
    if (props.title) {
      return (
        <div className="flex -translate-y-px items-center gap-3">
          {props.icon}
          <h2 className="text-lg font-semibold">{props.title}</h2>
        </div>
      );
    }
  };

  return (
    <div className="relative rounded-md border border-[#303030] bg-[#1d1c1d] p-4">
      {renderTitle()}
      <div className="mt-3">{props.children}</div>
    </div>
  );
};

export default GridItem;
