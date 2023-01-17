import { Typography } from '@mui/material'
import React from 'react'
import { ICategory } from '../models/interface'

type Props = {
    categories: ICategory[] | undefined
}

const Categories = ({categories}: Props) => {
  return (
    <>
    {categories !== undefined  && categories.map( (category: ICategory) =>
        {category.name}
    )}
    </>
  )
}

export default Categories