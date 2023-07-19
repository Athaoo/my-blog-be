import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'

import { Button, Card, Tag, Typography, Row, Col, Spin } from 'antd'
import { blue } from '@ant-design/colors'
import { getBlog } from './testData'
import { BlogPost } from '@src/types/articlePage'
import MarkdownRenderer from '@src/components/markdownRenderer'
import { formatDate } from '@src/utils/format'
import Mdxprovider from '@src/components/mdxProvider'

import { useRequest, getOneArticle } from '@src/api'

import type { Article } from '@src/api/types'

const { Title, Text } = Typography

const ColClass = {
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
}

const Tags = (tags) => {
  const tagColors = ['megenta', 'red', 'volcano', 'orange', 'lime', 'green', 'cyan', 'geekblue']
  const randomColor = () => {
    const idx = Math.round(Math.random() * tagColors.length)
    return tagColors[idx]
  }

  const MyTags = tags.map((tag) => (
    <Button shape={'round'} size={'large'} key={tag} style={{}}>
      {tag}
    </Button>
  ))

  return (
    <Row justify={'space-between'}>
      <Col span={24} style={ColClass}>
        {MyTags}
      </Col>
    </Row>
  )
}
const BackBtn = () => {
  const navigate = useNavigate()
  const back = () => {
    navigate('/article')
  }
  return <Button onClick={back}>返回首页</Button>
}

type HedaerProps = {
  data: Article
}
const Header: React.FC<HedaerProps> = ({ data }) => {
  return (
    <Row justify={'space-between'} style={{ height: '100%' }}>
      <Col style={ColClass}>
        <BackBtn />
      </Col>
      <Col style={ColClass}>
        <Title level={4} style={{ margin: 'auto' }}>
          {data.title}
        </Title>
      </Col>
      <Col style={ColClass}>
        <Text>{formatDate(data.createdAt)}</Text>
      </Col>
    </Row>
  )
}

const ArticleDetail: React.FC = () => {
  const { id } = useParams()
  const [article, setArticle] = useState<Article>(null)
  const [loading, apiGetArticle] = useRequest(getOneArticle)

  useEffect(() => {
    const get = async () => {
      const article = await apiGetArticle(Number(id))
      setArticle(article)
    }
    get()
  }, [])

  return loading ? (
    <Spin />
  ) : (
    <Card>
      <Card style={{ boxShadow: 'none' }} bordered={false}>
        <Header data={article} />
      </Card>
      <Card style={{ boxShadow: 'none' }} bordered={false}>
        {Tags(article.tags)}
      </Card>
      <Card style={{ boxShadow: 'none' }} bordered={false}>
        <MarkdownRenderer>{JSON.parse(article.content)}</MarkdownRenderer>
      </Card>
    </Card>
  )
}

export default ArticleDetail
