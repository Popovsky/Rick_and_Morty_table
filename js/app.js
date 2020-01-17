const data = fetch('https://rickandmortyapi.com/api/character/');
data
    .then(res => res.json())
    .then(res => {
        const {pages} = res.info;
        let obj = new Object();
        let objMale = new Object();
        let objFemale = new Object();
        let objUnknown = new Object();
        let objGenderless = new Object();
        Promise.all([...new Array(pages)].map((el,i) => fetch(`https://rickandmortyapi.com/api/character/?page=${i+1}`).then(res => res.json())))
            .then(res => {
                let arr = res.map(el => el.results);
                let arrayAllObjects = [];
                arr.map(el => el.map(e => arrayAllObjects.push(e)));

                arrayAllObjects.map(el => Array.isArray(obj[el.gender]) ? obj[el.gender].push(el) : obj[el.gender] = [el]);

                obj.Male.map(el => Array.isArray(objMale[el.status]) ? objMale[el.status].push(el) : objMale[el.status] = [el]);
                obj.Female.map(el => Array.isArray(objFemale[el.status]) ? objFemale[el.status].push(el) : objFemale[el.status] = [el]);
                obj.unknown.map(el => Array.isArray(objUnknown[el.status]) ? objUnknown[el.status].push(el) : objUnknown[el.status] = [el]);
                obj.Genderless.map(el => Array.isArray(objGenderless[el.status]) ? objGenderless[el.status].push(el) : objGenderless[el.status] = [el]);

                obj.Male = objMale;
                obj.Female = objFemale;
                obj.unknown = objUnknown;
                obj.Genderless = objGenderless;
                console.log(obj);
                
                const columns = ['id','name','status','species','type','gender'];
                columns.map(el => trh.appendChild(createHTMLNode('th', [], el)));
                arrayAllObjects.map(el => {
                    const trb = createHTMLNode('tr',[],null);
                    columns.map(elName => trb.appendChild(createHTMLNode('td', [], el[elName])));
                    tbody.appendChild(trb);
                });
            });
    });

const createHTMLNode = (tag, attrs, inner) => {
    const element = document.createElement(tag);
    attrs.map(attr => {element.setAttribute(attr.name, attr.value.join(' '))});
    inner?element.innerHTML=inner:null;
    return element;
}

const container = createHTMLNode('div',[{name: 'class',value: ['container']}],null);
const row = createHTMLNode('div',[{name: 'class',value: ['row']}],null);
const col = createHTMLNode('div',[{name: 'class',value: ['col-12']}],null);
const table = createHTMLNode('table',[{name: 'class',value: ['table']}],null);
const thead = createHTMLNode('thead',[],null);
const tbody = createHTMLNode('tbody',[],null);
const trh = createHTMLNode('tr',[],null);

container.appendChild(row);
row.appendChild(col);
col.appendChild(table);
table.appendChild(thead);
table.appendChild(tbody);
thead.appendChild(trh);

document.getElementById('root').appendChild(container);
