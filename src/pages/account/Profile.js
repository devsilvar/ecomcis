import React, { useEffect} from "react";
import SubText from "../../ui/account/SubText";
import Text from "../../ui/account/Text";
import Loader from "../../components/common/Loader";

import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../../store/features/account/profile";

function Profile() {

  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.getProfile);
  const { data, loading, error } = profileState;
  const handleGetProfile = () => {
    dispatch(getProfile());
  };
  useEffect(() => {
    handleGetProfile();
  }, []);


  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="w-[100%] border-[1px] max-w-[953px] p-[16px] h-[645px] overflow-scroll flex flex-col gap-[24px]">
      <div className="flex justify-between">
        <p className="font-[700] text-[#4E0240] text-[1.25rem]">MY PROFILE</p>
        <button className="bg-[#F2F2F2] text-[#4E0240] px-[22px] py-[8px]">EDIT</button>
      </div>

      <div>
        <SubText text="NAME" />
        <Text text={data?.full_name} />
      </div>

      <div>
        <SubText text="EMAIL" />
        <Text text={data?.email} />
      </div>

      <div>
        <SubText text="MOBILE" />
        <Text text={data?.mobile} />
      </div>
    </div>
  );
}

export default Profile;
