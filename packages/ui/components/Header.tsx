import React from "react";

interface HeaderProps {
  /**
   * Is this the principal call to action on the page?
   */
  title: string;
}

/**
 * The H1 Page header
 */
export const Header = ({ title }: HeaderProps) => {
  return <h1 className="text-6xl font-semibold ">{title}</h1>;
};
