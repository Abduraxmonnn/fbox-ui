import AvgTransactionsCountCard from "./NumberCards/AvgTransactionStats/AvgTransactionsCount";
import TransactionFinancialCard from "./NumberCards/TransactionFinancial/TransactionFinancialCard";
import Period from "./Period";
import TransactionNumberCard from "./NumberCards/TransactionNumberCard";
import NotifyNumberCard from "./NumberCards/NotifyNumber/NotifyNumberCard";
import PayMeTransactionsPieChart from "./Graphs/TransactionPieCharts/PayMe";
import ClickTransactionsPieChart from "./Graphs/TransactionPieCharts/Click";
import UzumTransactionsPieChart from "./Graphs/TransactionPieCharts/Uzum";
import AnorTransactionsPieChart from "./Graphs/TransactionPieCharts/Anor";
import DeviceLastStatusCard from "./NumberCards/DevicesStatus/DeviceLastStatusCard";
import DeviceStatusCard from "./NumberCards/DevicesStatus/DeviceStatusCard";
import TransactionsLineChart from "./Graphs/TransactionLineCharts/TransactionsLineChart";

export const analysisStats = {
    TransactionFinancialCard,
    Period,
    TransactionNumberCard,
    DeviceLastStatusCard,
    DeviceStatusCard,
    NotifyNumberCard,
    PayMeTransactionsPieChart,
    ClickTransactionsPieChart,
    UzumTransactionsPieChart,
    AnorTransactionsPieChart,
    AvgTransactionsCountCard,
    TransactionsLineChart
};
