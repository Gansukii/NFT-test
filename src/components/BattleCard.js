import React from "react";
import { contract } from "../data/contractProvider";

// const BattleCard = () => {
const BattleCard = ({ character }) => {
  const { name, description, attack } = character;
  const minimumDamage = 60;
  let isLoading = false;

  const handleAttack = () => {
    if (isLoading) return;

    isLoading = true;
    async function attackBoss() {
      const damage = attack | minimumDamage;
      const response = await contract.attack(damage);
      console.log(response);
      isLoading = false;
    }
    attackBoss();
  };

  return (
    <div>
      <div>{name}</div>
      <div>{description}</div>
      <div>{attack | 60}</div>
      <button onClick={handleAttack} disabled={isLoading}>
        Attack!
      </button>
    </div>
  );
};

export default BattleCard;
