/** Title: 图片水印 */
import { WaterMark } from '@ant-design/pro-components';

export default () => {
  return (
    <WaterMark
      height={36}
      width={115}
      content="qixian.cs"
      image="https://gw.alipayobjects.com/zos/bmw-prod/59a18171-ae17-4fc5-93a0-2645f64a3aca.svg"
    >
      <div style={{ height: 500 }}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam
          aliquid perferendis, adipisci dolorum officia odio natus facere cumque
          iusto libero repellendus praesentium ipsa cupiditate iure autem eos
          repudiandae delectus totam?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
          praesentium, aperiam numquam voluptatibus asperiores odio? Doloribus
          saepe, eligendi facere inventore culpa, exercitationem explicabo earum
          laborum deleniti reiciendis deserunt accusantium ullam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
          voluptas numquam impedit architecto facilis aliquam at assumenda,
          nostrum explicabo accusantium ipsam error provident voluptate
          molestias magnam quisquam excepturi illum sit!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
          accusantium quo corporis fugit possimus quaerat ad consequatur veniam
          voluptatum ut cumque illo beatae. Magni assumenda eligendi itaque eum
          voluptate non!
        </p>
      </div>
    </WaterMark>
  );
};
