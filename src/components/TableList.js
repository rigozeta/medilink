import { useState, useEffect } from "react";

import "../styles/TableList.scss"
import "../styles/Utils.scss"

function TableList(props) {
    const [products, setProducts] = useState([]);
    const [editId, setEditId] = useState(0);
    const [editTitle, setEditTitle] = useState("");
    const [editBrand, setEditBrand] = useState("");
    const [editDescription, setEditDescription] = useState("");

    const [searchStr, setSearchStr] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then((items) => {
            setProducts(items.products)
        });
    },[]);

    const editProduct = (id, title, brand, description) => {
        setEditId(id);
        setEditTitle(title);
        setEditBrand(brand);
        setEditDescription(description);
    }

    const updateProduct = (id, title, brand, description) => {
        let tempProducts = products;
        tempProducts.forEach((product) => {
            if(product.id === id) {
                product.title = title;
                product.brand = brand;
                product.description = description;
            }
        })

        setSearchStr("");
        setSearchResult([]);
        setEditId(0);
        setProducts([...tempProducts])
    }

    const sortList = (prop) => {
        let list = [];
        if(searchResult && searchStr.length) {
            list = searchResult;
        } else {
            list = products;
        }
        
        let sorted = list.sort((objA, objB) => {
            if ( objA[prop] < objB[prop] ){
                return -1;
            }
            if ( objA[prop] > objB[prop] ){
                return 1;
            }
            
            return 0;
        });

        if(searchResult && searchStr.length) {
            setSearchResult([...sorted])
        } else {
            setProducts([...sorted]);
        }
        
    }

    const searchTitle = (search) => {
        setSearchStr(search);

        let result = products.filter(item => `${item.title}`.toLocaleLowerCase().includes(searchStr.toLocaleLowerCase()));
        
        if(result.length) {
            setSearchResult([...result])
        } else {
            setSearchResult([]);
        }
    }

    return (
        <div id="TableList">
            <div className='text-right mb-3'>
                Hello <strong>{props.username}!</strong> <button className='btn secondary' onClick={() => props.logout()}>Log Out</button>
            </div>
            <div className='search-container'>
                <div class='form-block'>
                    <input type='text' name='search' id='search' placeholder='Search title...' value={searchStr} onChange={(e) => searchTitle(e.target.value)} />
                </div>
            </div>
            {!products.length && (
                <div className='loader' />
            )}

            {products.length && editId < 1 && (
                <table>
                    <thead>
                        <tr>
                            <th className="desktopOnly sortable" onClick={()=> sortList('id')}>ID &uarr;</th>
                            <th className="sortable" onClick={()=> sortList('title')}>Title &uarr;</th>
                            <th className="desktopOnly sortable" onClick={()=> sortList('brand')}>Brand &uarr;</th>
                            <th className="desktopOnly">Description</th>
                            <th className="desktopOnly">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!searchStr && products.map((product) => 
                            <tr key={product.id}>
                                <td className="desktopOnly">{product.id}</td>
                                <td>
                                    {product.title}
                                    <div className='mobileOnly'>
                                        <p>{product.brand}</p>
                                        <p>{product.description}</p>
                                        <p><button className='btn primary' onClick={() => editProduct(product.id, product.title, product.brand, product.description)}>Edit</button></p>
                                    </div>
                                </td>
                                <td className="desktopOnly">{product.brand}</td>
                                <td className="desktopOnly">{product.description}</td>
                                <td className="desktopOnly"><button className='btn primary' onClick={() => editProduct(product.id, product.title, product.brand, product.description)}>Edit</button></td>
                            </tr>
                        )}

                        {searchStr && searchResult.length > 1 && searchResult.map((product) => 
                            <tr key={product.id}>
                                <td className="desktopOnly">{product.id}</td>
                                <td>
                                    {product.title}
                                    <div className='mobileOnly'>
                                        <p>{product.brand}</p>
                                        <p>{product.description}</p>
                                        <p><button className='btn primary' onClick={() => editProduct(product.id, product.title, product.brand, product.description)}>Edit</button></p>
                                    </div>
                                </td>
                                <td className="desktopOnly">{product.brand}</td>
                                <td className="desktopOnly">{product.description}</td>
                                <td className="desktopOnly"><button className='btn primary' onClick={() => editProduct(product.id, product.title, product.brand, product.description)}>Edit</button></td>
                            </tr>
                        )}

                        {searchStr && searchResult.length < 1 && (
                            <tr>
                                <td colspan='5'>No results found...</td>
                            </tr>
                        )}
                    </tbody>                
                </table>
            )}

            {editId > 0 && (
                <div className='editForm'>
                    <form>
                        <div className='form-block'>
                            <label htmlFor='title'>Title</label>
                            <input type='text' name='title' id='title' defaultValue={editTitle} onChange={(e) => setEditTitle(e.target.value)}/>
                        </div>
                        <div className='form-block'>
                            <label htmlFor='brand'>Brand</label>
                            <input type='text' name='brand' id='brand' defaultValue={editBrand} onChange={(e) => setEditBrand(e.target.value)}/>
                        </div>
                        <div className='form-block'>
                            <label htmlFor='description'>Description</label>
                            <textarea name='description' id='description' defaultValue={editDescription} onChange={(e) => setEditDescription(e.target.value)}></textarea>
                        </div>
                    </form>
                    <div className='text-center'>
                        <button className='btn primary m-1' onClick={() => updateProduct(editId, editTitle, editBrand, editDescription)}>Save</button> 
                        <button className='btn secondary m-1' onClick={() => setEditId(0)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TableList;