"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateReplyAction } from "@/lib/database/actions/discussion.action";
import { useState } from "react";
import { useRouter } from 'next/navigation'

type ReplyProps = {
  postId: string;
};

const ReplyComponent = ({ postId }: ReplyProps) => {
  const router = useRouter()

  const [replyMessage, setreplyMessage] = useState<string>("");

  let usertoken = "";

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("x-auth-token");
    if (token) {
      usertoken = token;
    }
  }

  const replyToPost = async () => {
    console.log("this is working");

    const res = await CreateReplyAction({
      message: replyMessage,
      postId: postId,
      repliedUser: usertoken,
    });
    console.log("this is user response", res);
    router.refresh()
    setreplyMessage("")
  };
  

  return (
    <div>
      <div className="pb-40 mt-4">
        <Input
          onChange={(e) => {
            setreplyMessage(e.target.value);
          }}
          placeholder="reply here"
          value={replyMessage}
        />
        <Button onClick={replyToPost} className="w-full bg-zinc-900 mt-4">
          Submit Reply
        </Button>
      </div>
    </div>
  );
};

export default ReplyComponent;
