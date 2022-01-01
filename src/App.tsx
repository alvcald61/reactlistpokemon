import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {Layout, Menu, Breadcrumb, Card, Row, Col, Pagination, Space} from 'antd';
import CardMod from "./CardMod";
import {getTTFB} from "web-vitals";
const { Header, Content, Footer } = Layout;
const {Meta}=Card;

interface Pokemon{
    name:string;
    url:string
}


function App() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [pokemonPerPage, setPokemonPerPage] = useState(15);
    const [pageNumber, setPageNumber] = useState(1);
    const [countRef, setCountRef] = useState<number>();
    useEffect( () => {
          async function aux(){
              let aux=(await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${0}&limit=${1118}`))
              setPokemons(aux.data.results);
              setCountRef(aux.data.count);
          }
          aux();
    }, []);

    function getRows(numRows:number,data:Pokemon[],fin:number,inicio:number):JSX.Element[]{
        let arr:JSX.Element[]=[];

        for(let i=0;i<data.length;i+=numRows) {
            let aux = data.slice(i, i + numRows);
            arr.push(
                <Row justify={"space-between"} gutter={[16,24]} key={i}>
                    {
                        aux.map(
                            val=> <Col key={val.name}><CardMod pokemonInfo={val.url} title={val.name}></CardMod></Col>
                        )
                    }
                </Row>
            );
        }

        return arr;
    }

    function loadNextPage():JSX.Element[]{
        let aux=getRows(3, pokemons, pokemonPerPage, pageNumber).slice((pageNumber - 1) * pokemonPerPage / 3, (pageNumber) * pokemonPerPage / 3);
        return aux;
    }


    return (
      <Layout className="layout">
        <Header key={1}>
          <Menu theme="dark" mode="horizontal" key={2} >
            Pokemon List
          </Menu>
        </Header>
        <Content style={{ padding: '50px' }} className={"container"}>

            {
                loadNextPage().map(val => val)

            }
        </Content>
          <Footer>
              <div className={"container "}>
                  <div className="m-0 row justify-content-center">
                      <div className="col-auto ">
                            <Pagination defaultCurrent={1} total={countRef} showSizeChanger
                                        onShowSizeChange={(current, size)=>setPokemonPerPage(size)}
                                        pageSizeOptions={["15","30","45"]} defaultPageSize={15} onChange={(page, pageSize)=>setPageNumber(page)}/>
                      </div>
                  </div>
              </div>

          </Footer>
      </Layout>
  );
}

export default App;
