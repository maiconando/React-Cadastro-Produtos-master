import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as ProductService from "../../services/ProductService";


const activeItems = [
    { id: 'yes', title: 'Sim' },
    { id: 'no', title: 'Não' }

]

const initialFValues = {
    id: 0,
    fullName: '',
    amount: '',
    price: '',
    active: 'yes',
    supplier: '',
    datePurchase: new Date(),
    isPermanent: false,
}

export default function ProductForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('amount' in fieldValues)
            temp.amount = fieldValues.amount.length ? "" : "This field is required."
        if ('price' in fieldValues)
            temp.price = fieldValues.price.length ? "" : "This field is required."
        if ('description' in fieldValues)
            temp.description = fieldValues.description ? "" : "This field is required."
        if ('supplier' in fieldValues)
            temp.supplier = fieldValues.supplier ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="fullName"
                        label="Nome Produto"
                        value={values.fullName}
                        onChange={handleInputChange}
                        error={errors.fullName}
                    />
                    <Controls.Input
                        label="Quantidade"
                        name="amount"
                        value={values.amount}
                        onChange={handleInputChange}
                        error={errors.amount}
                    />
                    <Controls.Input
                        label="Preço"
                        name="price"
                        value={values.price}
                        onChange={handleInputChange}
                        error={errors.price}
                    />
                    <Controls.Input
                        label="Descrição"
                        name="description"
                        value={values.description}
                        onChange={handleInputChange}
                    />

                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup
                        name="active"
                        label="Ativo"
                        value={values.active}
                        onChange={handleInputChange}
                        items={activeItems}
                    />
                    <Controls.Select
                        name="supplier"
                        label="Fornecedor"
                        value={values.supplier}
                        onChange={handleInputChange}
                        options={ProductService.getSupplierCollection()}
                        error={errors.supplier}
                    />
                    <Controls.DatePicker
                        name="datePurchase"
                        label="Data da compra"
                        value={values.datePurchase}
                        onChange={handleInputChange}
                    />

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Salvar" />
                        <Controls.Button
                            text="Limpar"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
