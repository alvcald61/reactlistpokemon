import React, {FC, useEffect, useState} from 'react';
import {Card} from "antd";
import axios from "axios";
const {Meta} = Card

interface Prop  {
    pokemonInfo:string,
    title:string,
    description?: string
};

const CardMod:FC<Prop>=({pokemonInfo,title,description})=>{
    const [img, setImg] = useState<string>("");
    const [desc, setDesc] = useState("");
    useEffect(() => {
      async function aux(){
          let data=(await axios.get(pokemonInfo)).data;
          setImg(data.sprites.front_default);
          setDesc(`Este pokemon mide ${data.height*10} centimetros y pesa ${data.weight/10} Kilos y es de tipo ${data.types[0].type.name}`);
      }
      aux();
    }, []);
    return (
        <Card
            hoverable
            style={{ width: 240 , marginBottom:20}}
            cover={<img alt="example" src={img}/>}
        >
            <Meta title={title} description={desc} />
        </Card>
    );
}

export default CardMod;