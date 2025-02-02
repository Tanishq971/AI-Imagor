import React from "react";
import Header from "@/components/shared/Header";
import { transformationTypes } from "@/constants";
import TransformationForm from "@/components/shared/TransformationForm";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

const AddTransformationTypePage = async ({ params }: SearchParamProps) => {
  const session = await auth();
  const userId = session?.userId;
  const data = await currentUser();
  console.log("Current User:", data); // log the current user data
  console.log("User ID:", userId);
  const value = await params;
  const { type } = value;
  const Transformation = transformationTypes[type];

  //   if(!userId) redirect('/sign-in')
  const user = await getUserById("user_2sTJ6WXHTZZgMEc1l9wMCC8ck5R");

  return (
    <>
      <Header title={Transformation.title} subtitle={Transformation.subTitle} />

      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user._id}
          type={Transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  );
};

export default AddTransformationTypePage;
