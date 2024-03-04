import { ImgHTMLAttributes } from "react";

export interface IDivElementProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: React.HTMLAttributes<HTMLDivElement>["onClick"];
}

export interface ImgClickable extends React.HTMLAttributes<HTMLImageElement> {
  onClick?: ImgHTMLAttributes<HTMLImageElement>["onClick"];
}
