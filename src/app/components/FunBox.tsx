"use client";
import { useState } from "react";
import BallPit from "./FunBox/BallPit";
import Chat from "./FunBox/Chat";
import GridItem from "./GridItem";
import { Smile } from "react-feather";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

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
      <Tabs className="dark w-full -translate-y-[12px]" defaultValue={currentActivity.title}>
        <TabsList 
          className="dark w-full bg-transparent gap-2 p-0"
          defaultValue={currentActivity.title}
        >
          {activities.map((activity, index) => (
            <TabsTrigger
              key={index}
              value={activity.title}
              onClick={() => setCurrentActivity(activity)}
              className="dark w-1/2 h-10 hover:bg-zinc-900 transition-all"
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
