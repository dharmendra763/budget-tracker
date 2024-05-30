import { DateToUTCDate } from '@/lib/helpers'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

interface IProps {
    from: Date,
    to: Date
}

function TransactionTable({ from, to }: IProps) {
    const history = useQuery({
        queryKey: ["transactions", "history", from, to],
        queryFn: () => fetch(`/api/transactions-history?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`).then(res => res.json()),
    })
    return (
        <div>TransactionTable</div>
    )
}

export default TransactionTable