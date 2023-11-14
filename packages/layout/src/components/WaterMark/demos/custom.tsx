/** Title: 自定义配置 */
import {
  ProCard,
  ProForm,
  ProFormColorPicker,
  ProFormDependency,
  ProFormField,
  ProFormSlider,
  ProFormText,
  WaterMark,
} from '@ant-design/pro-components';
import { Divider } from 'antd';
import { ColorFactory } from 'antd/es/color-picker/color';

export default () => {
  return (
    <ProForm
      initialValues={{
        content: '示例水印',
        fontColor: 'rgba(0,0,0,.15)',
        fontSize: '16',
        zIndex: 9,
        rotate: '-22',
      }}
      submitter={false}
    >
      <ProCard
        split="vertical"
        title="水印自定义配置器"
        headerBordered
        bordered
      >
        <ProCard colSpan="70%">
          <ProFormDependency
            name={['rotate', 'content', 'fontColor', 'fontSize', 'zIndex']}
          >
            {({ rotate, content, fontColor, fontSize, zIndex }) => {
              return (
                <WaterMark
                  rotate={rotate}
                  content={content}
                  fontColor={
                    fontColor instanceof ColorFactory
                      ? fontColor.toHexString()
                      : fontColor
                  }
                  fontSize={fontSize}
                  zIndex={zIndex}
                >
                  <div>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Quisquam aliquid perferendis, adipisci dolorum officia
                      odio natus facere cumque iusto libero repellendus
                      praesentium ipsa cupiditate iure autem eos repudiandae
                      delectus totam?
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Illo praesentium, aperiam numquam voluptatibus asperiores
                      odio? Doloribus saepe, eligendi facere inventore culpa,
                      exercitationem explicabo earum laborum deleniti reiciendis
                      deserunt accusantium ullam.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Officia voluptas numquam impedit architecto facilis
                      aliquam at assumenda, nostrum explicabo accusantium ipsam
                      error provident voluptate molestias magnam quisquam
                      excepturi illum sit!
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aperiam, accusantium quo corporis fugit possimus quaerat
                      ad consequatur veniam voluptatum ut cumque illo beatae.
                      Magni assumenda eligendi itaque eum voluptate non!
                    </p>
                  </div>
                  <h4>
                    下面是一张zIndex 为 10 的 position 为 relative 图片，
                    <br /> 如果要在图片中展示水印尝试调大右侧的 zIndex
                    滑块试试。
                  </h4>
                  <img
                    src="https://gw.alipayobjects.com/zos/bmw-prod/d283f09a-64d6-4d59-bfc7-37b49ea0da2b.svg"
                    alt="示例图片"
                    width={600}
                    style={{
                      zIndex: 10,
                      maxWidth: '100%',
                      position: 'relative',
                    }}
                  />
                </WaterMark>
              );
            }}
          </ProFormDependency>
        </ProCard>
        <ProCard title="配置面板">
          <ProFormText label="水印文字" name="content" />
          <ProFormColorPicker label="字体颜色" name="fontColor" />
          <ProFormSlider label="字体大小" name="fontSize" />
          <ProFormSlider label="zIndex" name="zIndex" min={0} max={100} />
          <ProFormSlider label="旋转角度" name="rotate" min={-90} max={90} />
          <Divider />
          <ProFormDependency
            name={['rotate', 'content', 'fontColor', 'fontSize', 'zIndex']}
          >
            {({ rotate, content, fontColor, fontSize, zIndex }) => {
              return (
                <ProFormField
                  ignoreFormItem
                  mode="read"
                  valueType="code"
                  style={{ width: 220 }}
                  text={`<WaterMark
  rotate={${rotate}}
  content='${content}'
  fontColor='${fontColor}'
  fontSize={${fontSize}}
  zIndex={${zIndex}}
>
  <div>xxx</div>
</WaterMark>`}
                />
              );
            }}
          </ProFormDependency>
        </ProCard>
      </ProCard>
    </ProForm>
  );
};
