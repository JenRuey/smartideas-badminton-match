import React from "react";
import styled from "styled-components";

type ToggleButtonType = {
  toggled: boolean;
  onClick: (value: boolean) => void;
};

const StyledToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: -20px;
  position: relative;
  z-index: 2;
  label {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
  }

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #2510dd;
    transition: 0.3s;
    border-radius: 20px;
  }

  span:before {
    position: absolute;
    content: "";
    height: 15px;
    width: 15px;
    left: 3px;
    bottom: 2.6px;
    background-color: #fff;
    border-radius: 50%;
    transition: 0.3s;
  }

  input:checked + span {
    background-color: #00c853;
  }

  input:checked + span:before {
    transform: translateX(19px);
  }

  > div {
    margin: 0 8px;
    font-weight: bold;
    color: white;
  }
`;

export const TypeToggle = ({ toggled, onClick }: ToggleButtonType) => {
  const [isToggled, toggle] = React.useState(toggled);

  const callback = () => {
    toggle(!isToggled);
    onClick(!isToggled);
  };

  return (
    <StyledToggle>
      <div>{"Single"}</div>
      <label>
        <input type="checkbox" defaultChecked={isToggled} onClick={callback} />
        <span />
      </label>
      <div>{"Double"}</div>
    </StyledToggle>
  );
};
