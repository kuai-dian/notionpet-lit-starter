import { defineRender, defineUpdate, api } from '@notionpet/sdk'
import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { makeStyle } from './style'
import { defaultOptions } from './types'

const elementKey = 'my-element'
@customElement(elementKey)
export class MyElement extends LitElement {
  @property({ type: String })
  userName = '无名英雄'

  @property({ type: Number })
  visitorCount = 0

  @property({ type: Object })
  styles: any = {
    userName: '',
    visitor: '',
  }

  /**
   * 数据更新方法
   * @param param0
   */
  private data({options = {}, data = {}}: any) {
    options = Object.assign(defaultOptions, options)
    Object.entries({...options, ...data}).forEach(([k, v]) => (this as any)[k]= v)
    this.styles = makeStyle(options)
  }

  render() {
    this.data({}) // 页面进入立刻按数据更新一次

    defineUpdate(this.data) // 定义：当编辑器派送更新指令时候调用更新

    /**
     * 访问组价之后更新访客数据
     */
    ++this.visitorCount
    api.update({ visitorCount: this.visitorCount });  // 调用API保存当前访客数量

    return html`<div>
      👏 欢迎来到 <span style="${this.styles.userName}">${this.userName} </span>的小屋，你是本小屋第 <span style="${this.styles.visitor}">${this.visitorCount}</span> 位访客!
    </div>`
  }
}

// 初始化渲染方法
defineRender(({options = {}, data}) => {
  // 初始化数据
  options = Object.assign(defaultOptions, options)
  // 挂载节点为body
  const appElement = document.querySelector('body')
  // 创建组件节点
  const element = document.createElement(elementKey)
  // 批量设定组件属性
  Object.entries({...options, ...data}).forEach(([k, v]) => element.setAttribute(k, JSON.stringify(v)))
  // 创建组件节点
  appElement?.append(element)
}, process.env.NODE_ENV === 'development')

declare global {
  interface HTMLElementTagNameMap {
    [elementKey]: MyElement
  }
}
