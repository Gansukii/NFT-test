import React, { useState } from "react";
import { contract } from "../data/contractProvider";

// const BattleCard = () => {
const BattleCard = ({ character, setBossHP }) => {
  const { name, description, attack } = character;
  const [isLoading, setIsLoading] = useState(false);
  const minimumDamage = 60;

  const handleAttack = () => {
    if (isLoading) return;

    setIsLoading(true);
    async function attackBoss() {
      const damage = attack | minimumDamage;
      const response = await contract.attack(damage);
      const receipt = await response.wait();
      setBossHP(parseInt(receipt.events[0].args.currentBossHP._hex, 16));
      setIsLoading(false);
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
