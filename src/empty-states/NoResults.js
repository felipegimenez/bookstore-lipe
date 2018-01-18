import React, {Component} from 'react';

const NoResults = () =>{
    return(
        <div className="products">
            <div className="no-results">
                <img src="https://res.cloudinary.com/sivadass/image/upload/v1494699523/icons/bare-tree.png" alt="Empty Tree"/>
                <h2>Desculpe, nenhum livro encontrado com esse nome!</h2>
                <p>Pesquise um outro livro e tente novamente.</p>
            </div>
        </div>
    )
};

export default NoResults;