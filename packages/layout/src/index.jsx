export default (React) => {
  class _Descriptions extends React.Component {
    renderChildren = (dataIndex, value) => {
      const dataValue = value[dataIndex];

      if (dataIndex.startsWith('return')) {
        const fn = new Function('data', dataIndex);
        return fn(value);
      }

      if (Array.isArray(dataValue)) {
        return dataValue.map((mapItem) => {
          // 这是个附件
          if (mapItem.attachmentUrl)
            return (
              <div>
                <a href={mapItem.attachmentUrl}>{mapItem.attachmentName}</a>
              </div>
            );
          if (mapItem.value && mapItem.label) return <span> {mapItem.label}</span>;
          return <span key={mapItem.label}>{mapItem.label || mapItem}</span>;
        });
      }

      return dataValue;
    };

    renderTable(data, paramsColumns, column) {
      const trDomList = [];

      const columns = paramsColumns.map((item) => ({
        title: item.label,
        dataIndex: item.value,
        children: item.children,
      }));

      if (paramsColumns.some((item) => item.children)) {
        return (
          <div>
            {paramsColumns.map((item) => {
              return (
                <div key={item.value}>
                  <div
                    style={{
                      backgroundColor: '#eee',
                      fontSize: 16,
                      paddingLeft: 16,
                      margin: '0 -16px',
                      marginBottom: 8,
                    }}
                  >
                    {item.label}
                  </div>
                  {this.renderTable(data, item.children, column)}
                </div>
              );
            })}
          </div>
        );
      }

      if (Array.isArray(columns)) {
        const dom = columns.map(({ title, dataIndex }, index) => {
          if (!data[dataIndex] && !dataIndex.startsWith('return')) {
            return undefined;
          }
          return (
            <div
              key={dataIndex.toString() + index}
              style={{
                paddingBottom: 12,
                minWidth: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  fontSize: 14,
                  color: '#000000',
                  lineHeight: 1.5,
                }}
              >
                <div>{title}</div>:
                <div
                  style={{
                    flex: 1,
                    textAlign: 'left',
                    marginLeft: 8,
                  }}
                >
                  {this.renderChildren(dataIndex, data)}
                </div>
              </div>
            </div>
          );
        });
        dom.map((item, index) => {
          const itemNo = Math.floor(index / column);
          if (!trDomList[itemNo]) trDomList[itemNo] = [];
          trDomList[itemNo].push(item);
        });
      }

      return (
        <div
          style={{
            marginBottom: 16,
            padding: 16,
            paddingTop: 16,
            borderBottom: '1px solid #eee',
            fontFamily:
              '-apple-system,BlinkMacSystemFont,segoe ui,Roboto,helvetica neue,Arial,noto sans,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol,noto color emoji',
          }}
        >
          <div
            style={{
              width: '100%',
            }}
          >
            {trDomList.map((tdList, index) => {
              return (
                <div
                  key={index}
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                  }}
                >
                  {tdList.map((td) => td)}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    render() {
      let value = this.props.value || '[{}]';
      console.log('-------qixian------');
      console.log(this.props);
      try {
        if (typeof value === 'string') {
          value = JSON.parse(value);
        }
      } catch (error) {
        return <div>数据错误，请检查</div>;
      }

      const { setting } = this.props;
      let { columns, title, column } = setting;
      if (!columns) return <div />;

      try {
        if (typeof columns === 'string') {
          columns = JSON.parse(columns);
        }
      } catch (error) {
        return <div>数据错误，请检查</div>;
      }

      if (!Array.isArray(value)) {
        return (
          <div
            style={{
              margin: 16,
              padding: 16,
              paddingTop: 16,
              border: '1px solid #f0f0f0',
              backgroundColor: '#fff',
              margin: 16,
            }}
          >
            <h2
              style={{
                marginBottom: 16,
              }}
            >
              {title}
            </h2>
            {this.renderTable(value, columns, Number(column) || 3)}
          </div>
        );
      }
      return (
        <div>
          {value.map((data, index) => {
            return (
              <div
                key={index}
                style={{
                  backgroundColor: '#fff',
                  margin: 16,
                }}
              >
                <h2
                  style={{
                    marginBottom: 16,
                  }}
                >
                  {title}
                  {index + 1}
                </h2>
                {this.renderTable(data, columns, Number(column) || 3)}
              </div>
            );
          })}
        </div>
      );
    }
  }
  return {
    component: _Descriptions,
    badge: (
      <table className="detail-table">
        <tbody>
          <tr>
            <td>名称：值</td>
            <td>名称：值</td>
          </tr>
          <tr>
            <td>名称：值</td>
            <td>名称：值</td>
          </tr>
        </tbody>
      </table>
    ),
    setting: {
      label: '智科定义列表',
    },
    properties: [
      {
        group: '参数校验',
      },
      {
        group: '组件属性',
        edit: [
          ['表单标题', 'title', { ctrl: 'input', tips: '3' }],
          [
            '列配置',
            'columns',
            {
              ctrl: 'textarea',
              tips: "配置一个列，支持数组和嵌套数组 [{ title: '文本', key: 'text', dataIndex: 'id' },{ title: '文本', key: 'text', dataIndex: 'id2' }]",
            },
          ],
        ],
      },
    ],
  };
};
