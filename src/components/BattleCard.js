import React, { useState } from "react";
import { contract } from "../data/contractProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandFist, faHeart } from "@fortawesome/free-solid-svg-icons";

// const BattleCard = () => {
const BattleCard = ({ character, setBossHP }) => {
  const { name, description, attack, image, attributes } = character;
  const characterHP = attributes.filter((attribute) => attribute.trait_type === "HP")[0].value;

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
    <div className="mintCard">
      <div className="battleName">{name}</div>
      <div>
        <img src={image} className="mintableImage"></img>
      </div>
      <div className="mintData description">{description}</div>
      <div className="mintData">
        <FontAwesomeIcon icon={faHandFist} /> {attack | 60}
      </div>
      <div className="mintData">
        <FontAwesomeIcon icon={faHeart} /> {characterHP}
      </div>
      <button className="btnAttack" onClick={handleAttack} disabled={isLoading}>
        Attack!
      </button>
    </div>
  );
};

export default BattleCard;
