import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
//import ExpenseTotal from './ExpenseTotal';
const Budget = () => {
    const { dispatch } = useContext(AppContext);
    const { budget } = useContext(AppContext);
        
    const { expenses } = useContext(AppContext);
    const totalExpenses = expenses.reduce((total, item) => {
            return (total += item.cost);
    }, 0);

    const [newBudget, setNewBudget] = useState(budget);
    const handleBudgetChange = (event) => {
        if(event.target.value > 20000) {
            alert("The value cannot exceed 20000 £");
            // may need to revert to former budget value here
            return;
        }
        if(event.target.value < 0) {
            alert("The budget cannot be negative");
            return;
        }
                
        if(event.target.value < totalExpenses) {
            alert("You cannot reduce budget value lower than the spending");
            return;
        }
        setNewBudget(event.target.value);
        dispatch({
            type: 'SET_BUDGET',
            payload: event.target.value
        });     
    }
    return ( 
<div className='alert alert-secondary'>
<span>Budget: £</span>
<input type="number" step="10" value={newBudget} onChange={handleBudgetChange}></input>
</div>
    );
};
export default Budget;
