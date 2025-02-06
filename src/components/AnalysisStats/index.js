import AvgTransactionsCountCard from "./NumberCards/AvgTransactionStats/AvgTransactionsCount";
import TransactionFinancialCard from "./NumberCards/TransactionFinancial/TransactionFinancialCard";
import Period from "./Period";
import TransactionNumberCard from "./NumberCards/TransactionNumberCard";
import NotifyNumberCard from "./NumberCards/NotifyNumber/NotifyNumberCard";
import PayMeTransactionsPieChart from "./Graphs/Transactions/PieCharts/PayMe";
import ClickTransactionsPieChart from "./Graphs/Transactions/PieCharts/Click";
import UzumTransactionsPieChart from "./Graphs/Transactions/PieCharts/Uzum";
import AnorTransactionsPieChart from "./Graphs/Transactions/PieCharts/Anor";
import DeviceLastStatusCard from "./NumberCards/DevicesStatus/DeviceLastStatusCard";
import DeviceStatusCard from "./NumberCards/DevicesStatus/DeviceStatusCard";

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
};
