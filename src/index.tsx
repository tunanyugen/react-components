import "./index.scss";
import * as React from 'react';
import ReactDOM from 'react-dom';
import Input from './ts/Form/Input/Input';
import Select from "./ts/Form/Select/Select";
import TagInput from "./ts/Form/TagInput/TagInput";
import CheckBox from "./ts/Form/Checkbox/Checkbox";
import CKEditor from "./ts/Form/CKEditor/CKEditor";
import MediaInput from "./ts/Form/MediaInput/MediaInput";
import MultiMediaInput from "./ts/Form/MultiMediaInput/MultiMediaInput";
import Table from "./ts/Table/Table";
import Pagination from "./ts/Table/Pagination";
import SideMenu from "./ts/SideMenu/SideMenu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Toggler from "./ts/Form/Toggler/Toggler";
import ContextMenu from "./ts/ContextMenu/ContextMenu";
import { LightBoxProps } from "./ts/Lightbox/Lightbox";
import Button from "./ts/Form/Button/Button";
import { DataListItemProps } from "./ts/Form/Datalist/DataListItem";
import TextArea from "./ts/Form/TextArea/TextArea";
import Sortable from "./ts/Form/Sortable/Sortable";
import { TagProps } from "./ts/Form/Tag/Tag";
import MediaSelect from "./ts/Form/MediaSelect/MediaSelect";
import Slider from "./ts/Form/Slider/Slider";
import LabeledMediaSelect from "./ts/Form/LabeledMediaSelect/LabeledMediaSelect";
import Popup from "./ts/Popup/Popup";
import Optional from "./ts/Form/Optional/Optional";
require("@fortawesome/fontawesome-free/js/all");

interface DemoProps {
    
}
 
interface DemoState {
    items:DataListItemProps[];
    value:any;
    popupHidden:boolean;
    lightbox:LightBoxProps;
    selectCollapsed:boolean;
    shouldRefresh:boolean;
    tableContentIndex:number;
}
 
class Demo extends React.Component<DemoProps, DemoState> {
    tags:TagProps[] = [
        {value: { id: "1", value: "Tag 1" }},
        {value: { id: "3", value: "Tag 3" }},
        {value: { id: "2", value: "Tag 2" }},
    ]
    constructor(props: DemoProps) {
        super(props);
        this.state = {
            items: [
                {id: "1", value: "Item1"},
                {id: "2", value: "Item2"},
                {id: "3", value: "Item3"},
            ],
            value: "",
            popupHidden: true,
            lightbox: { hidden: false },
            selectCollapsed: true,
            shouldRefresh: false,
            tableContentIndex: 0,
        }
    }
    componentDidMount(){
        setTimeout(() => {
            this.setState({tableContentIndex: 15})
            // setTimeout(() => {
            //     this.setState({tableContentIndex: 0})
            // }, 2000);
        }, 2000);
        setTimeout(() => {
            this.setState({items: [
                {id: "4", value: "Item4"},
                {id: "5", value: "Item5"},
                {id: "6", value: "Item6"},
            ]}, () => {
                console.log("UPDATED")
            })
        }, 5000);
    }
    componentDidUpdate(prevProps: Readonly<DemoProps>, prevState: Readonly<DemoState>, snapshot?: any): void {
        if (this.state.shouldRefresh == true){
            this.setState({shouldRefresh: false})
        }
    }
    render() { 
        return (
            <React.Fragment>
                <Optional label="Optional">
                    <Input placeholder="Optional input" />
                    <Select
                        dataListProps={{
                            items: [
                                {id: "1", value: "Item 1"},
                                {id: "2", value: "Item 2"},
                                {id: "3", value: "Item 3"},
                            ]
                        }}
                    />
                </Optional>
            </React.Fragment>
        )
        return (
            <React.Fragment>
                <Button
                    onClick={() => {
                        if (this.state.popupHidden){
                            this.setState({popupHidden: !this.state.popupHidden});
                            setTimeout(() => {
                                this.setState({popupHidden: !this.state.popupHidden});
                            }, 3000);
                        }
                    }}
                >
                    Show popup
                </Button>
                <Popup
                    hidden={this.state.popupHidden}
                    style={{background: "white"}}
                >
                    <h1>Hiding popup in 3 seconds</h1>
                    <h1>Default popup will not have background</h1>
                </Popup>
                <Button
                    onClick={() => {
                        this.setState({shouldRefresh: true})
                    }}
                >
                    Refresh
                </Button>
                <Input
                    className="input-extended-class"
                    label="User"
                    name="user"
                    value="User 1"
                    placeholder="User"
                    error="Input error"
                    shouldRefresh={this.state.shouldRefresh}
                />
                <Select
                    className="select-extended-class"
                    label="Items"
                    inputProps={{
                        name: "item",
                        value: "item3",
                        placeholder: "Item",
                    }}
                    dataListProps={{
                        items: this.state.items
                    }}
                    error="Select error"
                    shouldRefresh={this.state.shouldRefresh}
                />
                <TagInput
                    name="tags[]"
                    label="Tags"
                    placeholder="Tags"
                    selectProps={{
                        dataListProps:{
                            items: this.state.items
                        },
                        inputProps:{}
                    }}
                    error="Tag input error"
                    shouldRefresh={this.state.shouldRefresh}
                    onChange={(tagProps) => {
                        console.log(tagProps);
                    }}
                />
                <MediaInput
                    name="media-input"
                    label="Media"
                    placeholder="Media input"
                    inputProps={{
                        value: "ASD"
                    }}
                    CKFinder={(window as any).CKFinder}
                    error="Media input error"
                    shouldRefresh={this.state.shouldRefresh}
                />
                <MultiMediaInput
                    name="multi_media_input[]"
                    label="Medias"
                    placeholder="Multi media input"
                    CKFinder={(window as any).CKFinder}
                    error="Multi media input error"
                    shouldRefresh={this.state.shouldRefresh}
                />
                <Sortable
                    name="sortable[]"
                    label="Sortable"
                    error="Sortable error"
                    shouldRefresh={this.state.shouldRefresh}
                    className="sortable"
                    tagProps={this.tags.map((tag, index) => {
                        return {
                            index: index,
                            value: tag.value
                        }
                    })}
                    selectProps={{
                        dataListProps: {
                            items: this.state.items
                        },
                    }}
                    onChange={(props) => {
                        console.log(props)
                    }}
                />
                <Slider
                    className="test"
                    label="Slider"
                    max={100}
                    min={0}
                    name="slider"
                    onChange={(e) => { console.log(e.target.value) }}
                    shouldRefresh={this.state.shouldRefresh}
                    value={23}
                />
                <CheckBox
                    name="checkbox"
                    label="Checkbox"
                    error="Checkbox error"
                    shouldRefresh={this.state.shouldRefresh}
                />
                <Toggler
                    name="name"
                    shouldRefresh={this.state.shouldRefresh}
                />
                <CKEditor
                    name="ckeditor"
                    label="CKEditor"
                    placeholder="CKEditor content"
                    error="CKEditor error"
                    value="CK Content"
                    CKEditorConfig={{
                        fontColor:{
                            colors: [
                                { color: '#d12229' },
                                { color: '#393939' },
                                { color: '#FFFFFF' },
                            ]
                        },
                    }}
                    shouldRefresh={this.state.shouldRefresh}
                    onChange={(content) => { console.log(content) }}
                />
                <TextArea
                    name="textarea"
                    value="Text area value"
                    label="Text area"
                    error="Text area error"
                    shouldRefresh={this.state.shouldRefresh}
                />
                <MediaSelect
                    images={[
                        "https://ichef.bbci.co.uk/news/976/cpsprodpb/67CF/production/_108857562_mediaitem108857561.jpg",
                        "https://ichef.bbci.co.uk/news/976/cpsprodpb/67CF/production/_108857562_mediaitem108857561.jpg",
                        "https://ichef.bbci.co.uk/news/976/cpsprodpb/67CF/production/_108857562_mediaitem108857561.jpg",
                        "https://ichef.bbci.co.uk/news/976/cpsprodpb/67CF/production/_108857562_mediaitem108857561.jpg",
                    ]}
                    value="https://ichef.bbci.co.uk/news/976/cpsprodpb/67CF/production/_108857562_mediaitem108857561.jpg"
                    onSelect={(src) => { console.log(src) }}
                    className="test"
                    error="Media select error"
                    label="Media select"
                    name="media-select"
                    shouldRefresh={this.state.shouldRefresh}
                />
                <LabeledMediaSelect
                    items={[
                        {
                            label: "Label 1",
                            src: "https://ichef.bbci.co.uk/news/976/cpsprodpb/67CF/production/_108857562_mediaitem108857561.jpg",
                            onClick: (src) => { console.log("Item " + src) }
                        },
                        {
                            label: "Label 2",
                            src: "https://ichef.bbci.co.uk/news/976/cpsprodpb/67CF/production/_108857562_mediaitem108857561.jpg"
                        },
                        {
                            label: "Label 3",
                            src: "https://ichef.bbci.co.uk/news/976/cpsprodpb/67CF/production/_108857562_mediaitem108857561.jpg"
                        },
                        {
                            label: "Label 3",
                            src: "https://ichef.bbci.co.uk/news/976/cpsprodpb/67CF/production/_108857562_mediaitem108857561.jpg"
                        },
                    ]}
                    value="https://ichef.bbci.co.uk/news/976/cpsprodpb/67CF/production/_108857562_mediaitem108857561.jpg"
                    onSelect={(src) => { console.log(src) }}
                    className="test"
                    error="Labeled media select error"
                    label="Labeled media select"
                    name="labeled-media-select"
                    shouldRefresh={this.state.shouldRefresh}
                />
                <Table>
                    {this.renderTableChildren(this.state.tableContentIndex)}
                </Table>
                <Pagination
                    pageCount={2}
                />
                <SideMenu
                    logo="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Google_logo_%282013-2015%29.svg/1024px-Google_logo_%282013-2015%29.svg.png"
                    sideMenuMainItemProps={[
                        { name: "Main item 1", icon:"https://s3.amazonaws.com/iconbros/icons/icon_pngs/000/001/514/original/article-content.png?1554875144" },
                    ]}
                    sideMenuItemProps={[
                        { name: "Item 1", icon:"https://s3.amazonaws.com/iconbros/icons/icon_pngs/000/001/514/original/article-content.png?1554875144", sideMenuItemProps:[
                            { name: "Item 1", icon:"https://s3.amazonaws.com/iconbros/icons/icon_pngs/000/001/514/original/article-content.png?1554875144", to:"/admin/test" },
                            { name: "Item 2", icon:"https://s3.amazonaws.com/iconbros/icons/icon_pngs/000/001/514/original/article-content.png?1554875144" },
                            { name: "Item 3", icon:"https://s3.amazonaws.com/iconbros/icons/icon_pngs/000/001/514/original/article-content.png?1554875144" },
                        ]},
                        { name: "Item 2", icon:"https://s3.amazonaws.com/iconbros/icons/icon_pngs/000/001/514/original/article-content.png?1554875144" },
                        { name: "Item 3", icon:"https://s3.amazonaws.com/iconbros/icons/icon_pngs/000/001/514/original/article-content.png?1554875144" },
                    ]}
                    onSelect={(item) => {
                        console.log(item);
                    }}
                />
                <ContextMenu
                    itemsProps={[
                        {
                            icon: "https://static.thenounproject.com/png/2021808-200.png",
                            name: "item1",
                            contextMenuProps: {
                                itemsProps: [
                                    {
                                        icon: "https://static.thenounproject.com/png/2021808-200.png",
                                        name: "item1"
                                    },
                                    {
                                        icon: "https://static.thenounproject.com/png/2021808-200.png",
                                        name: "item2"
                                    },
                                ]
                            }
                        },
                        {
                            icon: "https://static.thenounproject.com/png/2021808-200.png",
                            name: "item2",
                            contextMenuProps: {
                                itemsProps: [{
                                    icon: "https://static.thenounproject.com/png/2021808-200.png",
                                    name: "item1"
                                },
                                {
                                    icon: "https://static.thenounproject.com/png/2021808-200.png",
                                    name: "item2",
                                    contextMenuProps: {
                                        itemsProps: [{
                                            icon: "https://static.thenounproject.com/png/2021808-200.png",
                                            name: "item1"
                                        },
                                        {
                                            icon: "https://static.thenounproject.com/png/2021808-200.png",
                                            name: "item2",
                                            contextMenuProps: {
                                                itemsProps: [{
                                                    icon: "https://static.thenounproject.com/png/2021808-200.png",
                                                    name: "item1"
                                                },
                                                {
                                                    icon: "https://static.thenounproject.com/png/2021808-200.png",
                                                    name: "item2"
                                                },
                                                {
                                                    icon: "https://static.thenounproject.com/png/2021808-200.png",
                                                    name: "item3"
                                                },]
                                            }
                                        },
                                        {
                                            icon: "https://static.thenounproject.com/png/2021808-200.png",
                                            name: "item3"
                                        },]
                                    }
                                },
                                {
                                    icon: "https://static.thenounproject.com/png/2021808-200.png",
                                    name: "item3"
                                },]
                            }
                        },
                        {
                            icon: "https://static.thenounproject.com/png/2021808-200.png",
                            name: "item3"
                        },
                    ]}
                />
            </React.Fragment>
        );
    }
    renderTableChildren = (count:number) => {
        return (
            <React.Fragment>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                {(function(){
                        let items = [];
                        for (let i = 0; i < count; i++){
                            items.push(
                                <tr key={`user-${i}`} >
                                    <td>{i}</td>
                                    <td>User {i}</td>
                                    <td>user{i}@gmail.com</td>
                                </tr>
                            )
                        }
                        return items;
                    })()}
                </tbody>
            </React.Fragment>
        )
    }
}

ReactDOM.render(
    <Router>
        <Demo/>
    </Router>,
    document.querySelector("#root")
)