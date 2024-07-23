export const onFilter = (value, record) => {
    const today = new Date().toISOString().slice(0, 10)
    const pastSevenDays = new Date(
        new Date().setDate(new Date().getDate() - 7)
    ).toISOString().slice(0, 10)
    switch (value) {
        case 'today':
            return record.end_date === today
        case 'pastSevenDays':
            return record.end_date >= pastSevenDays && record.end_date <= today
        case 'noDate':
            return record.end_date === '----/--/--'
        case 'hasDate':
            return record.end_date !== '----/--/--'
        default:
            return true
    }
}