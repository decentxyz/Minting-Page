import { NextPage } from "next";
import axios from "axios";
import ZoraBox from "../components/ZoraBox";

export const bigintSerializer = (key: string, value: unknown): unknown => {
  if (typeof value === 'bigint') {
    return value.toString() + 'n';
  }

  return value;
};

export const bigintDeserializer = (key: string, value: unknown): unknown => {
  if (typeof value === 'string' && /^-?\\\\d+n$/.test(value)) {
    return BigInt(value.slice(0, -1));
  }

  return value;
};

const Zora: NextPage = (props: any) => {
  const baseUrl = 'https://box-v1.api.decent.xyz/api';
  const actionRequest = {
    
  }

  return (
    <>
      <ZoraBox />
      {props.text}
    </>
  );
};

export default Zora;