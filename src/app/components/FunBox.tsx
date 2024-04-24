"use client";
import { useState } from "react";
import BallPit from "./FunBox/BallPit";
import Chat from "./FunBox/Chat";
import GridItem from "./GridItem";
import { Smile } from "react-feather";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

const FunBox = () => {
  const activities = [
    {
      title: "Ball Pit",
      icon: <Smile />,
      component: <BallPit />,
    },
    {
      title: "Chat",
      icon: <Smile />,
      component: <Chat />,
    },
  ];

  const [currentActivity, setCurrentActivity] = useState<any>(activities[0]);

  const renderButtons = () => {
    return (
      <Tabs
        className="dark w-full -translate-y-[12px]"
        defaultValue="Ball Pit"
      >
        <TabsList
          className="dark w-full gap-2 border border-[#303030] bg-transparent"
        >
          {activities.map((activity, index) => (
            <TabsTrigger
              key={index}
              value={activity.title}
              onClick={() => setCurrentActivity(activity)}
              className="h-8/10 dark w-1/2 transition-all hover:bg-zinc-900"
            >
              {activity.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    );
  };

  return (
    <GridItem title={""} icon={currentActivity.icon}>
      {renderButtons()}
      <div className="h-60 w-full">{currentActivity.component}</div>
    </GridItem>
  );
};

export default FunBox;
