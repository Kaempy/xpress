import { columns, Payment } from './columns';
import DataTable from './data-table';

const getData = async (): Promise<Payment[]> => {
  return [
    {
      id: '03e457',
      first_name: 'Mary',
      last_name: 'Adebanjo',
      phone_number: '+234706 370 0760',
      partner: 'Sammies Sensation',
      location: 'Mainland',
      status: 'active',
    },
    {
      id: '489e1d42',
      first_name: 'Ken',
      last_name: 'Okoye',
      phone_number: '+234800 230 0000',
      partner: 'Chicken Republic',
      location: 'Festac',
      status: 'deactivated',
    },
    {
      id: '489e1d45',
      first_name: 'Mure',
      last_name: 'Daniel',
      phone_number: '+234803 705 4340',
      partner: 'Cilantro',
      location: 'Asokoro',
      status: 'awaiting-approval',
    },
    {
      id: '48991d42',
      first_name: 'Temitope',
      last_name: 'Adejumoke',
      phone_number: '+234800 000 0000',
      partner: 'The Place',
      location: 'Gudu',
      status: 'deactivated',
    },
    {
      id: '489e1d22',
      first_name: 'Damilare',
      last_name: 'Ademeso',
      phone_number: '+234813 677 6626',
      partner: 'The Place',
      location: 'Maitama',
      status: 'awaiting-approval',
    },
    {
      id: '578g2a10',
      first_name: 'Emeka',
      last_name: 'Ogbu',
      phone_number: '+234909 111 2233',
      partner: 'Kilimanjaro',
      location: 'Ikeja',
      status: 'active',
    },
    {
      id: '674h5b32',
      first_name: 'Funmi',
      last_name: 'Adedayo',
      phone_number: '+234805 765 4321',
      partner: 'Dominos Pizza',
      location: 'Victoria Island',
      status: 'active',
    },
    {
      id: '784c6d98',
      first_name: 'Abubakar',
      last_name: 'Shehu',
      phone_number: '+234808 999 0000',
      partner: 'Mr Biggs',
      location: 'Kano',
      status: 'deactivated',
    },
    {
      id: '875d7e65',
      first_name: 'Tope',
      last_name: 'Ogunbanjo',
      phone_number: '+234902 222 5555',
      partner: 'Chicken Republic',
      location: 'Surulere',
      status: 'awaiting-approval',
    },
    {
      id: '963e8f71',
      first_name: 'Oluchi',
      last_name: 'Nwosu',
      phone_number: '+234807 444 7777',
      partner: 'Genesis Deluxe',
      location: 'Lekki',
      status: 'active',
    },
    {
      id: '103a9g85',
      first_name: 'Samson',
      last_name: 'Agada',
      phone_number: '+234810 555 6666',
      partner: 'Tantalizers',
      location: 'Wuse',
      status: 'deactivated',
    },
    {
      id: '214b1h92',
      first_name: 'Chinedu',
      last_name: 'Okafor',
      phone_number: '+234803 123 4567',
      partner: 'Sweet Sensation',
      location: 'Gwarinpa',
      status: 'active',
    },
    {
      id: '325c2i05',
      first_name: 'Zainab',
      last_name: 'Bello',
      phone_number: '+234806 987 6543',
      partner: 'The Place',
      location: 'Jabi',
      status: 'awaiting-approval',
    },
    {
      id: '436d3j18',
      first_name: 'Bolu',
      last_name: 'Ajayi',
      phone_number: '+234901 234 5678',
      partner: 'Kilimanjaro',
      location: 'Oniru',
      status: 'active',
    },
    {
      id: '547e4k31',
      first_name: 'Fatima',
      last_name: 'Abdul',
      phone_number: '+234909 876 5432',
      partner: 'Tasty Fried Chicken',
      location: 'Apapa',
      status: 'deactivated',
    },
    {
      id: '658f5l44',
      first_name: 'Sola',
      last_name: 'Odetunde',
      phone_number: '+234802 345 6789',
      partner: 'Dominos Pizza',
      location: 'Gbagada',
      status: 'active',
    },
    {
      id: '769g6m57',
      first_name: 'Aisha',
      last_name: 'Mohammed',
      phone_number: '+234810 567 8901',
      partner: 'Mr Biggs',
      location: 'Port Harcourt',
      status: 'awaiting-approval',
    },
    {
      id: '870h7n70',
      first_name: 'Segun',
      last_name: 'Olawale',
      phone_number: '+234809 678 9012',
      partner: 'The Place',
      location: 'Yaba',
      status: 'active',
    },
    {
      id: '981i8o83',
      first_name: 'Nkechi',
      last_name: 'Eze',
      phone_number: '+234803 789 0123',
      partner: 'Chicken Republic',
      location: 'Ajah',
      status: 'deactivated',
    },
    {
      id: '109j9p96',
      first_name: 'Tobi',
      last_name: 'Adekunle',
      phone_number: '+234808 890 1234',
      partner: 'Sweet Sensation',
      location: 'Oshodi',
      status: 'active',
    },
  ];
};

const DashboardPage = async () => {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};
export default DashboardPage;
