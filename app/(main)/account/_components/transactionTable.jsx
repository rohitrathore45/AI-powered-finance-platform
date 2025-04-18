"use client"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { categoryColors } from '@/data/categories'
import { format } from 'date-fns'
import { Clock, MoreHorizontal, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const RECURRING_INTERVALS = {
    DAILY: "Daily",
    WEEKLY: "Weekly",
    MONTHLY: "Monthly",
    YEARLY: "Yearly"
}

const TransactionTable = ({ transactions }) => {

    const router = useRouter();

    const filteredAndSortedTransacctions = transactions;

    const handleSort = () => {}

  return (
    <div className='space-y-4'>
        {/* Fillter */}


        {/* Transactions */}
        <div className='rounded-md border '>
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[50px]">
                    <Checkbox/>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={()=>handleSort("date")}>
                    <div className='flex items-center'>Date</div>
                </TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="cursor-pointer" onClick={()=>handleSort("category")}>
                    <div className='flex items-center'>Category</div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={()=>handleSort("amount")}>
                    <div className='flex items-center justify-end'>Amount</div>
                </TableHead>
                <TableHead>Reccuring</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredAndSortedTransacctions.length === 0 ? (
                    <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                        No Transactions Found
                    </TableCell>
                    </TableRow>
                ) : (
                    filteredAndSortedTransacctions.map((transaction, index) => (
                    <TableRow key={transaction.id || index}>
                        <TableCell >
                            <Checkbox/>
                        </TableCell>
                        <TableCell>{format(new Date(transaction.date), "PP")}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell className='capitalize'>
                            <span style={{
                                background: categoryColors[transaction.category],
                                className:'px-2 py-1 rounded text-white text-sm'
                            }}>{transaction.category}</span>
                        </TableCell>
                        <TableCell className="text-right font-medium" style={{
                            color: transaction.type =="EXPENSE" ? "red" : "green"
                        }}>
                            {transaction.type ==="EXPENSE" ? "-" : "+"}
                            ${transaction.amount.toFixed(2)}
                        </TableCell>
                        <TableCell>
                            {transaction.isRecurring ? (
                                <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Badge variant='outline' 
                                            className='gap-1 bg-purple-100 text-purple-700 hover:bg-purple-200'>
                                            <RefreshCw className='h-3 w-3'/>
                                            <Clock className='h-3 w-3'/>
                                            {RECURRING_INTERVALS[transaction.recurringInterval]}
                                        </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <div className='text-sm'>
                                            <div className='font-medium'>Next Date:</div>
                                            <div>{format(new Date(transaction.nextRecurringDate), "PP")}</div>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                                </TooltipProvider>
                              
                            ) : <Badge variant='outline' className='gap-1'>
                                    <Clock className='h-3 w-3'/>
                                One-time</Badge>}
                        </TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant='ghost' className='h-8 w-8 p-0'>
                                        <MoreHorizontal className='h-4 w-4'/> 
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel
                                        onClick={() => {
                                            router.push(`/transaction/create?edit=${transaction.id}`)
                                        }}
                                    >
                                        Edit
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem 
                                        className='text-destructive' //onClick={() => deletFn([transaction.id])}
                                    >
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
        </div>
    </div>
  )
}

export default TransactionTable