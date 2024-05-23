import React from 'react';
import {PieMainPage} from "../components/charts/PieMainPage";
import {useCitizens} from "../hooks/fetch/useCitizens";

const Main = () => {
    const {data} = useCitizens();

    const newData = data?.map(item => ([
        item.birthDate.split('-')[0]
    ]));

    let countYoungAdults: number = 0;
    let countAdults: number = 0;
    let countSeniors: number = 0;

    newData && newData.forEach((item: string[], index: number) => {
        const currentYear: number = new Date().getFullYear();
        const age: number = currentYear - parseInt(item[0]);

        if (!isNaN(age)) {
            if (age > 18 && age < 26) {
                countYoungAdults++;
            } else if (age >= 26 && age < 50) {
                countAdults++;
            } else if (age >= 50) {
                countSeniors++;
            }
        }
    });


    const dataForCharts = [
        {value: countYoungAdults, name: '18-25 лет', color: 'red'},
        {value: countAdults, name: '26-50 лет', color: 'green'},
        {value: countSeniors, name: '50+ лет', color: 'blue'},

    ];

    return (
        <div style={{
            margin: "30px auto",
            maxWidth: "1320px",
            minHeight: "700px",
            backgroundColor: "#f8f6f6",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            padding: "3px 20px",
            borderRadius: "40px"
        }}>
            <div>
                <h1>Добро пожаловать в сообщество граждан! Совместно создаем лучшее будущее!</h1>
                <p>
                    Приветствуем вас в нашем виртуальном доме, где каждый член нашего сообщества имеет возможность
                    внести
                    свой вклад в развитие общества, делая его более справедливым, устойчивым и дружелюбным. Здесь мы
                    собираемся, чтобы обмениваться идеями, выражать мнения, находить решения и вдохновлять друг друга на
                    действие.
                </p>
                <p>
                    Присоединяйтесь к нам сегодня и вместе мы сможем достичь большего. Давайте вместе строить мир, в
                    котором каждый гражданин имеет возможность процветать и реализовывать свой потенциал.
                </p>
                <p>
                    С уважением,<br/>
                    <span style={{fontWeight: "bold"}}>
                    Команда сайта граждан

                    </span>
                </p>
            </div>
            <div style={{marginLeft: "360px"}}>
                <PieMainPage
                    data={dataForCharts}
                    chartName="Возрастная категория: "
                    subtext="Граждане по возрасту: "
                />
            </div>
        </div>

    );
};

export default Main;