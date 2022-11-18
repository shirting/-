//词云STT
import React, {useEffect, useState,Component} from 'react'
import axios from "axios";
import {render} from "react-dom";

class Wordle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: this.props.language,
            data: this.props.data,
        }
    }

    componentWillReceiveProps(props) {
        console.log(props)
        this.setState({
            language: props.language,
            data: props.data,
        }, () => {
            console.log("wordle", this.state.data)
            if(props.data.length!=0) {
                this.render()
                this.wordle()
            }
        })
    }

    componentDidMount() {
        this.wordle()
    }

    wordle() {
        var tagEle = "querySelectorAll" in document ? document.querySelectorAll(".tag") : getClass("tag")
        var paper = "querySelectorAll" in document ? document.querySelector(".tagBall") : getClass("tagBall")[0];
        var RADIUS = 220,
            fallLength = 700,
            tags = [],
            angleX = Math.PI / 700,
            angleY = Math.PI / 700,
            CX = paper.offsetWidth / 2.2,
            CY = paper.offsetHeight / 2.2,
            EX = paper.offsetLeft + document.body.scrollLeft + document.documentElement.scrollLeft,
            EY = paper.offsetTop + document.body.scrollTop + document.documentElement.scrollTop;

        function getClass(className) {
            var ele = document.getElementsByTagName("*");
            var classEle = [];
            for (var i = 0; i < ele.length; i++) {
                var cn = ele[i].className;
                if (cn === className) {
                    classEle.push(ele[i]);
                }
            }
            return classEle;
        }

        function innit() {
            const colors = ['rgb(203, 236, 109)','rgb(253, 236, 109)', 'rgb(149, 206, 255)', 'rgba(0,236,255,0.9)', 'rgb(169, 255, 150)', 'rgb(255, 188, 117)', 'rgba(255,255,255,0.9)', 'rgb(68, 169, 168)', 'rgb(145, 232, 225)', 'rgba(255,255,255,0.8)'];
            const fontSizes=[6,8,10,12,14,16,18];
            const oneSize=parseInt(tagEle.length/7);
            for (var i = 0; i < tagEle.length; i++) {
                var a, b;
                var k = -1 + (2 * (i + 1) - 1) / tagEle.length;
                var a = Math.acos(k);
                var b = a * Math.sqrt(tagEle.length * Math.PI);
                var x = RADIUS * 1.15 * Math.sin(a) * Math.cos(b);
                var y = RADIUS * Math.sin(a) * Math.sin(b);
                var z = RADIUS * Math.cos(a);
                var t = new tag(tagEle[i], x, y, z);
                tagEle[i].style.color = colors[parseInt(Math.random() * 10)];
                tagEle[i].style.fontSize = fontSizes[parseInt(i/oneSize)]+"px";
                tags.push(t);
                t.move();
            }
        }

        /*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/
        // Array.prototype.forEach = function (callback) {
        //     for (var i = 0; i < this.length; i++) {
        //         callback.call(this[i]);
        //     }
        // }

        function animate() {
            rotateX();
            rotateY();
            tags.forEach(function (ele) {
                ele.move();
            });

            requestAnimationFrame(animate);
        }

        function rotateX() {
            var cos = Math.cos(angleX);
            var sin = Math.sin(angleX);
            tags.forEach(function (ele) {
                var y1 = ele.y * cos - ele.z * sin;
                var z1 = ele.z * cos + ele.y * sin;
                ele.y = y1;
                ele.z = z1;
            })

        }

        function rotateY() {
            var cos = Math.cos(angleY);
            var sin = Math.sin(angleY);
            tags.forEach(function (ele) {
                var x1 = ele.x * cos - ele.z * sin;
                var z1 = ele.z * cos + ele.x * sin;
                ele.x = x1;
                ele.z = z1;
            })
        }

        var tag = function (ele, x, y, z) {
            // console.log(ele,x,y,z,this.ele,this.x,this.y,this.z)
            this.ele = ele;
            this.x = x;
            this.y = y;
            this.z = z;
        }

        tag.prototype = {
            move: function (e) {
                var scale = fallLength / (fallLength - this.z);
                var alpha = (this.z + RADIUS) / (2 * RADIUS);
                var left = this.x + CX - this.ele.offsetWidth / 2 + "px";
                var top = this.y + CY - this.ele.offsetHeight / 2 + "px";
                var transform = 'translate(' + left + ', ' + top + ') scale(' + scale + ')';
                this.ele.style.opacity = alpha + 0.1;
                this.ele.style.zIndex = parseInt(scale * 100);
                this.ele.style.transform = transform;
                this.ele.style.webkitTransform = transform;
            }
        }
        innit();
        animate();
    }

    render() {

        return (
            <ul className="tagBall">
                {this.state.data.map(ele => (<li className="tag">
                    <span>{ele.name}</span>
                    <p className="value-tag">{ele.name}：{ele.count}</p>
                </li>))}
            </ul>
        );
    }
}
export default Wordle

