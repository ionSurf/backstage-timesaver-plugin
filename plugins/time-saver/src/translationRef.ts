import { createTranslationRef } from '@backstage/core-plugin-api/alpha';

export const TimeSaverTranslationRef = createTranslationRef({
  id: 'plugin.time-saver',
  messages: {
    AllStatsBarChart: {
      options: {
        plugins: {
          title: 'All Statistics'
        }
      },
      dataAll: {
        datasets: {
          label: 'Time Saved'
        }
      }
    },
    BarChart: {
      dataAll: {
        datasets: {
          label: 'Time Saved'
        }
      }
    },
    ByTeamBarChart: {
      dataAll: {
        datasets: {
          label: 'Time Saved'
        }
      }
    },
    ByTemplateBarChart: {
      datasets: 'Time Saved',
    },
    Gauge: {
      EmptyTimeSaver: {
        emptyData: 'Please fill your templates with data, they will be displayed after their executions'
      },
      TeamsGauge: {
        gaugeHeading: 'Groups'
      },
      TemplatesGauge: {
        gaugeHeading: 'Templates'
      },
      TemplateCountGauge: {
        gaugeHeading: 'Template executions'
      },
    },
    GroupDivisionPieChart: {
      options: {
        plugins: {
          title: 'Team Percentage Distribution'
        }
      }
    },
    StatsTable: {
      columns: {
        team: {
          headerName: 'Team',
        },
        templateName: {
          headerName: 'Template Name',
        },
        sum: {
          headerName: 'Sum',
        },
      }
    },
    TeamSelector: {
      formControl: {
        inputLabel: 'Team',
        select: {
          label: 'Team'
        }
      }
    },
    DailyTimeSummaryLineChartTeamWise: {
      options: {
        plugins: {
          title: 'Daily Time Summary by Team'
        },
        scales: {
          x: {
            labelString: 'Date'
          },
          y: {
            labelString: 'Total Time Saved'
          }
        }
      }
    },
    TeamWiseTimeSummaryLinearChart: {
      options: {
        plugins: {
          title: 'Time Summary by Team'
        },
        scales: {
          x: {
            labelString: 'Date'
          },
          y: {
            labelString: 'Total Time Saved'
          }
        }
      }
    },
    TemplateAutocomplete: {
      textField: {
        label: 'Template Name'
      }
    },
    TemplateTaskAutocomplete: {
      textField: {
        label: 'TemplateTaskId'
      }
    },
    DailyTimeSummaryLineChartTemplateWise: {
      options: {
        plugins: {
          title: 'Daily Time Summary by Template'
        },
        scales: {
          x: {
            labelString: 'Date'
          },
          y: {
            labelString: 'Total Time Saved'
          }
        }
      }
    },
    TemplateWiseTimeSummaryLinearChart: {
      options: {
        plugins: {
          title: 'Time Summary by Template'
        },
        scales: {
          x: {
            labelString: 'Date'
          },
          y: {
            labelString: 'Total Time Saved'
          }
        }
      }
    },
    TimeSaverPageComponent: {
      GaugesContainer: {
        hoursTimeSavedGauge: 'Time Saved [hours]',
        daysTimeSavedGauge: 'Time Saved [days]'
      },
      page: {
        header: {
          title: 'Backstage TS plugin!',
          subtitle: 'Check saved time with TS plugin!',
          ownerHeaderLabel: {
            label: 'Owner'
          },
          lifecycleHeaderLabel: {
            label: 'Lifecycle'
          }
        },
        content: {
          header: {
            title: 'Time Saver',
            tabs: {
              allStatsTab: {
                label: 'All Stats'
              },
              byTeamTab: {
                label: 'By Team'
              },
              byTemplateTab: {
                label: 'By Template'
              }
            },
            SupportButton: 'Time Saver plugin retrieves its config from template.metadata and groups it in a dedicated table, then it has a bunch of APIs for data queries'
          },
          body: {
            InfoCard: {
              title: 'Time statistics that you have saved using Backstage Templates'
            }
          }
        }
      }
    }
  },
});